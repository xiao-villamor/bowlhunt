import {prisma} from '../../../server/prisma.js'
import {json} from "@sveltejs/kit";

export const GET = async (event) => {

        let searchParams = event.url.searchParams;
        let page = searchParams.get('page');


        let Notes = searchParams.get('Notes');
        let Flavours = searchParams.get('Flavours');



        let tobaccos = [];


        if (Notes || Flavours ) {
                //split the string into an array using the - as a delimiter
                let notes = [];
                let flavours = [];
                if(Notes !== null)  notes = Notes.split('-');
                if(Flavours !== null) flavours = Flavours.split('-');


                tobaccos = await prisma.mix.findMany({
                        skip: page * 16,
                        take: 16,
                        orderBy: {
                                createdAt: 'desc'
                        },
                        where: {
                                Tobacco: {
                                        some: {
                                                tobacco: {
                                                        OR: [
                                                                {
                                                                        Notes: {
                                                                                hasSome: notes,
                                                                                mode: 'insensitive',

                                                                        },
                                                                },
                                                                {
                                                                        flavours: {
                                                                                hasSome: flavours,
                                                                                mode: 'insensitive',
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
                                createdAt: 'desc'
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

        //return a json with a header for caching
        return json(tobaccos, {

        });
}
