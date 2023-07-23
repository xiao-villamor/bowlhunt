import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create newmixes
    const tobacco1 = await prisma.tobacco.create({
        data: {
            name: 'Blue Mist',
            brand: 'Al Fakher',
            flavours: ['BlueBerry', 'Mint'],
            Notes: ['Fruity', 'Minty', 'Sweet'],
            tobaccoType: 'Blonde',
            availableRegions: ['Europe', 'US'],
            rating: 4.5,
            colour: 'bg-cyan-300',
        },
    });

    const tobacco2 = await prisma.tobacco.create({
        data: {
            name: 'Lemon squeezy',
            brand: 'Revoshi',
            flavours: ['Lemon', 'Cake'],
            colour: 'bg-yellow-300',
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
            colour: 'bg-red-400',
        },
    });

    const tobacco4 = await prisma.tobacco.create({
        data: {
            name: 'Watermelon Splash',
            brand: 'Starbuzz',
            flavours: ['Watermelon', 'Lemonade'],
            Notes: ['Refreshing', 'Citrusy', 'Sweet'],
            tobaccoType: 'Blonde',
            availableRegions: ['North America', 'Europe'],
            rating: 4.2,
            colour: 'bg-red-300',
        },
    });

    const tobacco5 = await prisma.tobacco.create({
        data: {
            name: 'Double Apple',
            brand: 'Nakhla',
            flavours: ['Apple', 'Anise'],
            Notes: ['Traditional', 'Licorice-like', 'Sweet'],
            tobaccoType: 'Dark Leaf',
            availableRegions: ['Middle East', 'Africa'],
            rating: 4.0,
            colour: 'bg-red-800',
        },
    });

    const tobacco6 = await prisma.tobacco.create({
        data: {
            name: 'Peach Paradise',
            brand: 'Fumari',
            flavours: ['Peach', 'Passion Fruit'],
            Notes: ['Tropical', 'Fruity', 'Juicy'],
            tobaccoType: 'Blonde',
            availableRegions: ['North America', 'Europe'],
            rating: 4.7,
            colour: 'bg-rose-300',
        },
    });

    const tobacco7 = await prisma.tobacco.create({
        data: {
            name: 'Choco Mint',
            brand: 'Tangiers',
            flavours: ['Chocolate', 'Mint'],
            Notes: ['Rich', 'Cooling', 'Indulgent'],
            tobaccoType: 'Noir',
            availableRegions: ['North America', 'Europe'],
            rating: 4.3,
            colour: 'bg-emerald-500',
        },
    });

    const tobacco8 = await prisma.tobacco.create({
        data: {
            name: 'Grapefruit Fusion',
            brand: 'Social Smoke',
            flavours: ['Grapefruit', 'Mint'],
            Notes: ['Citrusy', 'Refreshing', 'Tangy'],
            tobaccoType: 'Blonde',
            availableRegions: ['North America', 'Europe'],
            rating: 4.1,
            colour: 'bg-purple-500',
        },
    });

    const tobacco9 = await prisma.tobacco.create({
        data: {
            name: 'Vanilla Sky',
            brand: 'Haze',
            flavours: ['Vanilla', 'Cream'],
            Notes: ['Smooth', 'Creamy', 'Sweet'],
            tobaccoType: 'Blonde',
            availableRegions: ['North America', 'Europe'],
            rating: 4.4,
            colour: 'bg-yellow-100',
        },
    });

    const tobacco10 = await prisma.tobacco.create({
        data: {
            name: 'Mango Tango',
            brand: 'Tropicana',
            flavours: ['Mango', 'Pineapple'],
            Notes: ['Tropical', 'Exotic', 'Sweet'],
            tobaccoType: 'Blonde',
            availableRegions: ['Asia', 'Australia'],
            rating: 4.6,
            colour: 'bg-amber-400',
        },
    });

    const tobacco11 = await prisma.tobacco.create({
        data: {
            name: 'Raspberry Burst',
            brand: 'Fusion',
            flavours: ['Raspberry', 'Lime'],
            Notes: ['Fruity', 'Tangy', 'Refreshing'],
            tobaccoType: 'Blonde',
            availableRegions: ['Europe', 'US'],
            rating: 4.2,
            colour: 'bg-red-500',
        },
    });

    const tobacco12 = await prisma.tobacco.create({
        data: {
            name: 'Strawberry Fields',
            brand: 'Adalya',
            flavours: ['Strawberry', 'Cream'],
            Notes: ['Sweet', 'Creamy', 'Fruity'],
            tobaccoType: 'Blonde',
            availableRegions: ['Europe', 'Middle East'],
            rating: 4.3,
            colour: 'bg-red-600',
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
                    { tobaccoId: tobacco11.id, tobaccoPercentage: 30 },
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
                    { tobaccoId: tobacco12.id, tobaccoPercentage: 70 },
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
                    { tobaccoId: tobacco12.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco11.id, tobaccoPercentage: 70 },
                ],
            },
            likes: 5,
        },
    });

    await prisma.mix.create({
        data: {
            name: 'Tropical Breeze',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco3.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco6.id, tobaccoPercentage: 40 },
                    { tobaccoId: tobacco8.id, tobaccoPercentage: 30 },
                ],
            },
            likes: 15,
        },
    });

    await prisma.mix.create({
        data: {
            name: 'Minty Melon',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco4.id, tobaccoPercentage: 50 },
                    { tobaccoId: tobacco7.id, tobaccoPercentage: 50 },
                ],
            },
            likes: 8,
        },
    });

    await prisma.mix.create({
        data: {
            name: 'Fruit Medley',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco2.id, tobaccoPercentage: 25 },
                    { tobaccoId: tobacco5.id, tobaccoPercentage: 25 },
                    { tobaccoId: tobacco9.id, tobaccoPercentage: 25 },
                    { tobaccoId: tobacco10.id, tobaccoPercentage: 25 },
                ],
            },
            likes: 12,
        },
    });

    await prisma.mix.create({
        data: {
            name: 'Candy Crush',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco1.id, tobaccoPercentage: 40 },
                    { tobaccoId: tobacco6.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco8.id, tobaccoPercentage: 30 },
                ],
            },
            likes: 6,
        },
    });

    await prisma.mix.create({
        data: {
            name: 'Citrus Splash',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco3.id, tobaccoPercentage: 60 },
                    { tobaccoId: tobacco7.id, tobaccoPercentage: 40 },
                ],
            },
            likes: 9,
        },
    });
    await prisma.mix.create({
        data: {
            name: 'Tropical Paradise',
            Tobacco: {
                create: [
                { tobaccoId: tobacco1.id, tobaccoPercentage: 30 },
                { tobaccoId: tobacco2.id, tobaccoPercentage: 30 },
                { tobaccoId: tobacco3.id, tobaccoPercentage: 20 },
                { tobaccoId: tobacco4.id, tobaccoPercentage: 20 },
                ],
            },
            likes: 8,
        },
    });

    await prisma.mix.create({
        data: {
            name: 'Minty Mango',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco4.id, tobaccoPercentage: 40 },
                    { tobaccoId: tobacco5.id, tobaccoPercentage: 60 },
                ]
            },
            likes: 12,
        }});
    await prisma.mix.create({
        data: {
            name: 'Berry Blast',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco6.id, tobaccoPercentage: 50 },
                    { tobaccoId: tobacco7.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco8.id, tobaccoPercentage: 20 },
                ],
            },
            likes: 10,
        }});
    await prisma.mix.create({
        data: {
            name: 'Citrus Delight',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco9.id, tobaccoPercentage: 40 },
                    { tobaccoId: tobacco10.id, tobaccoPercentage: 60 },
                ],
            },
            likes: 15,
        }});
    await prisma.mix.create({
        data: {
            name: 'Exotic Fusion',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco1.id, tobaccoPercentage: 25 },
                    { tobaccoId: tobacco2.id, tobaccoPercentage: 25 },
                    { tobaccoId: tobacco3.id, tobaccoPercentage: 25 },
                    { tobaccoId: tobacco4.id, tobaccoPercentage: 25 },
                ],
            },
            likes: 9,
        }});
    await prisma.mix.create({
        data: {
            name: 'Cool Mint',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco5.id, tobaccoPercentage: 60 },
                    { tobaccoId: tobacco6.id, tobaccoPercentage: 40 },
                ],
            },
            likes: 11,
        }});
    await prisma.mix.create({
        data: {
            name: 'Sweet Berry',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco7.id, tobaccoPercentage: 40 },
                    { tobaccoId: tobacco8.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco9.id, tobaccoPercentage: 30 },
                ],
            },
            likes: 7,
        }});
    await prisma.mix.create({
        data: {
            name: 'Fruity Punch',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco10.id, tobaccoPercentage: 50 },
                    { tobaccoId: tobacco1.id, tobaccoPercentage: 50 },
                ],
            },
            likes: 13,
        }});
    await prisma.mix.create({
        data: {
            name: 'Creamy Dream',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco2.id, tobaccoPercentage: 40 },
                    { tobaccoId: tobacco3.id, tobaccoPercentage: 30 },
                    { tobaccoId: tobacco4.id, tobaccoPercentage: 30 },
                ],
            },
            likes: 6,
        }});

    await prisma.mix.create({
        data: {
            name: 'Tropical Lime',
            Tobacco: {
                create: [
                    { tobaccoId: tobacco5.id, tobaccoPercentage: 50 },
                    { tobaccoId: tobacco6.id, tobaccoPercentage: 50 },
                ],
            },
            likes: 14,
        }});

}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});