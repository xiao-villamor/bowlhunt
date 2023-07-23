import {prisma} from '../../../server/prisma.js'
import {json} from "@sveltejs/kit";
import {redis} from "../../../server/redis.js";

export const GET = async (event) => {

    let searchParams = event.url.searchParams;
    let page = searchParams.get('page');

    const cached = await redis.get(event.url.href);

    if (cached) {
        return json(JSON.parse(cached));
    }

    let Notes = searchParams.get('Notes');
    let Flavours = searchParams.get('Flavours');

    let tobaccos = [];

    if (Notes || Flavours) {
        //split the string into an array using the - as a delimiter
        let notes = [];
        let flavours = [];
        if(Notes !== null)  notes = Notes.split('-');
        if(Flavours !== null) flavours = Flavours.split('-');

        console.log(notes, flavours)

        tobaccos = await prisma.mix.findMany({
            skip: page * 16,
            take: 16,
            orderBy: {
                likes: 'desc'
            },
            where: {
                Tobacco: {
                    some: {
                        tobacco: {
                            OR: [
                                {
                                    Notes: {
                                        hasSome: notes

                                    },
                                },
                                {
                                    flavours: {
                                        hasSome: flavours
                                    },
                                }
                            ]
                        }
                    }
                }
            },
            select: {
                id: true,
                name: true,
                likes: true,
                createdAt: true,
                updatedAt: true,
                Tobacco: true,
            }
        });



    }else {


        tobaccos = await prisma.mix.findMany({
            skip: page * 16,
            take: 16,
            orderBy: {
                likes: 'desc'
            },




            select: {
                id: true,
                name: true,
                likes: true,
                createdAt: true,
                updatedAt: true,
                Tobacco: true,
            }
        });
    }
    redis.set(event.url.href, JSON.stringify(tobaccos), 'EX', 60);

    //return a json with a header for caching
    return json(tobaccos, {
        headers: {
            'Cache-Control': 'max-age=60'
        }
    });
}