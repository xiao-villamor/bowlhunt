import {prisma} from '../../../server/prisma.js'
import {json} from "@sveltejs/kit";
import {redis} from "../../../server/redis.js";

export const GET = async (event) => {

    try {

        const cached = await redis.get(event.url.href);
        if (cached) {
            return json(JSON.parse(cached));
        }

        let searchParams = event.url.searchParams;


        const tobaccos = await prisma.tobacco.findMany({
            where: {
                brand: {
                    contains: searchParams.get('name')
                }
            },
            orderBy: {
                name: 'asc'
            }
            //get only the name


        });

        redis.set(event.url.href, JSON.stringify(tobaccos), 'EX', 60);
        return json(tobaccos, {
        });
    }catch (e) {
        return json({error: e.message}, {status: 500});
    }

}