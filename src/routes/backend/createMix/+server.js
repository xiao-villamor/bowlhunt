import {prisma} from "../../../server/prisma.js";

export const POST = async (event) => {
    //get the body from the event the number of likes and the id of the tobacco to update

    const requestBody = await event.request.text();
    const parsedBody = JSON.parse(requestBody);
    const tobaccos = parsedBody.tobaccos;
    const name = parsedBody.name;

    let response
    let error = false

    //print the tobaccos

    if (name === null || name === "") {
        error = true
        response = new Response(JSON.stringify("Error the Name is missing"), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    tobaccos.some(tobacco => {
        console.log(tobacco)
        if (tobacco.tobaccoId === null && tobacco.hidden === false) {
            error = true
            response = new Response(JSON.stringify("Error some tobacco are missing"), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    });


    if (error === false) {
        try {
            const mix = await prisma.mix.create({
                data: {
                    name: name,
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
            response = new Response(JSON.stringify("Error while creating the mix"), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
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