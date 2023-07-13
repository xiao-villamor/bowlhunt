import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create mix
    const tobacco1 = await prisma.tobacco.create({
        data: {
            name: 'Blue Mist',
            brand: 'Al Fakher',
            flavours: ['BlueBerry', 'Mint'],
            Notes: ['Fruity', 'Minty', 'Sweet'],
            tobaccoType: 'Blonde',
            availableRegions: ['Europe', 'US'],
            rating: 4.5,
            colour: 'blue',
        },
    });

    const tobacco2 = await prisma.tobacco.create({
        data: {
            name: 'Lemon squeezy',
            brand: 'Revoshi',
            flavours: ['Lemon', 'Cake'],
            colour: 'yellow',
            Notes: ['Sour', 'Creamy', 'Sweet'],
            tobaccoType: 'Black ',
            availableRegions: ['US', 'Germany'],
            rating: 3.8,

        },
    });

    const tobacco3 = await prisma.tobacco.create({
        data: {
            name: 'Red Cake',
            brand: 'Amda',
            flavours: ['Chease Cake', 'Strawberry'],
            Notes: ['fruity', 'Creamy', 'Sweet'],
            tobaccoType: 'Blonde ',
            availableRegions: ['Spain'],
            rating: 5.0,
            colour: 'red',
        },
    });

    // Create mixes
    await prisma.mix.create({
        data: {
            name: 'Blue Lemon',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco1.id, tobaccoPercentage: 40 },
                    { tobaccoId: tobacco2.id, tobaccoPercentage: 60 },
                ],
            },
            likes: 10,
        },
    });

    await prisma.mix.create({
        data: {
            name: 'Forest Cake',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco1.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco3.id, tobaccoPercentage: 70 },
                ],
            },
            likes: 5,
        },
    });
    await prisma.mix.create({
        data: {
            name: 'Forest Cake',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco1.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco2.id, tobaccoPercentage: 70 },
                ],
            },
            likes: 5,
        },
    });
    await prisma.mix.create({
        data: {
            name: 'Forest Cake',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco3.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco2.id, tobaccoPercentage: 70 },
                ],
            },
            likes: 5,
        },
    });
    await prisma.mix.create({
        data: {
            name: 'Forest Cake',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco1.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco3.id, tobaccoPercentage: 70 },
                ],
            },
            likes: 5,
        },
    });
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});