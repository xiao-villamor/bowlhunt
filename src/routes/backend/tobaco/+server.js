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


        const tobacco = await prisma.tobacco.findUnique({
            where: {
                id: parseInt(searchParams.get('id'))
            }
        })

        console.log(tobacco)

        redis.set(event.url.href, JSON.stringify(tobacco), 'EX', 60);
        return json(tobacco, {
        });
    }catch (e) {
        return json({error: e.message}, {status: 500});
    }

}