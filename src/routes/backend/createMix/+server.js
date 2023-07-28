import {prisma} from "../../../server/prisma.js";

export const POST = async (event) => {
    //get the body from the event the number of likes and the id of the tobacco to update

    const requestBody = await event.request.text();
    const parsedBody = JSON.parse(requestBody);
    const tobaccos = parsedBody.tobaccos;

    let response
    let error = false


    //iterate over the tobaccos

    //if any of tobaccos has the field tobaccoId return error

    tobaccos.some(tobacco => {
        if (tobacco.tobaccoId === null && tobacco.hidden === false) {
            error = true
            response = new Response(JSON.stringify("tobaccoId is missing"), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    });

    //create a new mix with the tobaccos
    try {
        const mix = await prisma.mix.create({
            data: {
                name: "mix",
                likes: 0, // You can set the default value for 'likes' here, or leave it to be set by the database.
            },
        });

        const mixId = mix.id;

        // Creating associated records in the mixToTobacco table
        for (const tobacco of tobaccos) {
            if (tobacco.hidden === true) continue;
            await prisma.mixToTobacco.create({
                data: {
                    mixId: mixId,
                    tobaccoId: tobacco.tobaccoId,
                    tobaccoPercentage: tobacco.percentage,
                },
            });
        }
    } catch (e) {
        console.error(e);
        error = true;
        response = new Response(JSON.stringify("error"), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    if(!error){
        response = new Response(JSON.stringify("ok"), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    return response



}