import {prisma} from '../../../server/prisma.js'
import {json} from "@sveltejs/kit";

export const GET = async (event) => {


        let searchParams = event.url.searchParams;
        let page = searchParams.get('page');

        const tobaccos = await prisma.mix.findMany({
                skip: page * 5,
                take: 5,
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

        return json(tobaccos);

}
