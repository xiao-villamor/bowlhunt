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

        const tobaccos = await prisma.mix.findMany({
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
        redis.set(event.url.href, JSON.stringify(tobaccos), 'EX', 60);

        //return a json with a header for caching
        return json(tobaccos, {
                headers: {
                        'Cache-Control': 'max-age=60'
                }
        });
}
