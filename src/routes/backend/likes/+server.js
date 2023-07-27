import {prisma} from "../../../server/prisma.js";


export const POST = async (event) => {
    //get the body from the event the number of likes and the id of the tobacco to update

    const requestBody = await event.request.text();
    const parsedBody = JSON.parse(requestBody);
    const { likes, id } = parsedBody;

    //update the tobacco with the month number of likes
    const tobacco = await prisma.mix.update({
        where: {
            id: id
        },
        data: {
            likes: likes
        }
    })

    return new Response(JSON.stringify(tobacco), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });



}