import { Request, Response } from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(request: Request, response: Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() { //toda vez que se usa "whereExists", se recomenda usar "whereRaw" no lugar de "where"
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') //verificando se o "class_id" que está dentro do "class_schedule" é igual ao "id" que está dentro do "classes"... as crazes `` indicam que é "tabela.coluna" e não um texto string da vida...
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) // cada "??" equivale a 1 parâmetro passado dentro do "[ ]"... neste caso: irá verificar se o "week_day" que está dentro do "class_schedule" é "=" ao "week_day" (que é uma constante, do tipo "string", que recebe seu valor do "filters.subject")
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]) //verifica se o "from" que esta dentro do "class_schedule" possui o parâmetro é "<=" ao "timeInMinutes"... ou seja, se ele começa a dar aula antes ou igual ao msm tempo
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]) //parecido com o anterior, verifica se ele da aula até o horário informado; no entanto, se ele para as 12, não pode ter ninguém agendando aula as 12... tem que ser sempre, no mínimo, inferior para fazer sentido
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id') //join no SQL junta as tabelas
            .select(['classes.*', 'users.*']); //select no SQL pega os valores das tabelas... o "*" significa todos os valores

        return response.json(classes);
    }


    async create(request: Request, response: Response) {
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    const trx = await db.transaction();//trx = abreviação de transaction

    try { //se sucesso, faz o abaixo
        const insertedUsersIds = await trx('users').insert({
            name, //name: name... avatar: avatar...
            avatar,
            whatsapp,
            bio,
        })

        const user_id = insertedUsersIds[0];

        const insertedClassesIds = await trx('classes').insert({
            subject, //subject: subject... cost: cost...
            cost,
            user_id,
        })

        const class_id = insertedClassesIds[0];

        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            };
        })

        await trx('class_schedule').insert(classSchedule);

        await trx.commit();

        return response.status(201).send(); //status 201 no HTML significa "criado com sucesso"
    } catch (err) { //catch = se der erro
        console.log(err);
        
        await trx.rollback(); //desfaz qualquer alteração no DB em caso de erro

        return response.status(400).json({ //status 400 no HTML significa "erro genérico"
            error: 'Unexpected error while creating new class'
        })
    }

}}