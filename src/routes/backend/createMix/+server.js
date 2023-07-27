export const POST = async (event) => {
    //get the body from the event the number of likes and the id of the tobacco to update

    const requestBody = await event.request.text();
    const parsedBody = JSON.parse(requestBody);
    const tobaccos = parsedBody.tobaccos;

    let response
    let error = false

    //iterate over the tobaccos

    console.log(tobaccos.length);

    //if any of tobaccos has the field tobaccoId return error

    tobaccos.some(tobacco => {
        console.log(tobacco.tobaccoId)
        console.log(tobacco.tobaccoId === null && tobacco.hidden === false)
        if (tobacco.tobaccoId === null && tobacco.hidden === false) {
            console.log("tobaccoId is missing")
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
    const mix = prisma.mix.create({
        data: {
            tobaccos: {
                create: tobaccos
            }
        }
    }).catch(e => {
        console.log(e)
        error = true
        response = new Response(JSON.stringify("error"), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    })


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