import {prisma} from '../../../server/prisma.js'
import {json} from "@sveltejs/kit";

export const GET = async (event) => {

    let searchParams = event.url.searchParams;
    console.log("Trending")

    let page = searchParams.get('page');


    let Notes = searchParams.get('Notes');
    let Flavours = searchParams.get('Flavours');

    let date = new Date();
    date.setMonth(date.getMonth() - 1);



    let tobaccos ;

    console.log("Trending")
    console.log(Notes)
    console.log(Flavours)

    if (Notes || Flavours) {
        //split the string into an array using the - as a delimiter
        let notes = [];
        let flavours = [];
        if(Notes !== null)  notes = Notes.split('-');
        if(Flavours !== null) flavours = Flavours.split('-');

        try {
            tobaccos = await prisma.mix.findMany({
                skip: page * 16,
                take: 16,
                orderBy: {
                    likes: 'desc'
                },

                where: {
                    createdAt: {
                        gt: date
                    },
                    Tobacco: {
                        some: {
                            tobacco: {
                                OR: [
                                    {
                                        Notes: {
                                            hasSome: notes,


                                        },
                                    },
                                    {
                                        flavours: {
                                            hasSome: flavours,
                                        },
                                    }
                                ],
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    likes: true,
                    createdAt: true,
                    Tobacco: true,
                }
            });
        }catch (e) {
            console.error(e);
        }

    }else {


        tobaccos = await prisma.mix.findMany({
            skip: page * 16,
            take: 16,
            orderBy: {
                likes: 'desc'
            },

            where: {
                createdAt: {
                    gt: date
                }
                },


            select: {
                id: true,
                name: true,
                likes: true,
                createdAt: true,
                Tobacco: true,
            }
        });
    }

    //return a json with a header for caching
    return json(tobaccos, {
    });
}