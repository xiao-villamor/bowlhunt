import {prisma} from '../../../server/prisma.js'
import {json} from "@sveltejs/kit";


export const GET = async (event) => {

        //get the UrlsearchParams
        //console.log(event.url.searchParams)
        let searchParams = event.url.searchParams;
        const tobacco = await prisma.tobacco.findUnique({
            where: {
                id: parseInt(searchParams.get('id'))
            }
        })

        return json(tobacco);

}