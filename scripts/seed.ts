import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding CMG Productionz database...');

  // --- Events ---
  const events = [
    {
      id: 'evt-truck-meet-may-2026',
      title: 'CMG Truck Meet',
      description: 'Come out for our biggest truck meet of the spring! VIP parking is $10 and enters you to win awards. Spectator parking is FREE. All trucks welcome - lifted, stock, classic, custom, diesel, 4x4 & more!',
      date: new Date('2026-05-30T18:00:00'),
      time: '6:00 PM - 9:00 PM',
      location: 'Gadsden, AL',
      address: '530 E Meighan Blvd, Gadsden, AL 35903',
      imageUrl: '/flyer.png',
      price: 'VIP $10 / Spectator FREE',
      featured: true,
      category: 'TRUCK_MEET',
      status: 'UPCOMING',
    },
    {
      id: 'evt-summer-showdown-2026',
      title: 'Summer Showdown Truck Show',
      description: 'The ultimate summer truck show is here! Multiple award categories, food vendors, live music, and the best trucks in Northeast Alabama on display.',
      date: new Date('2026-07-12T17:00:00'),
      time: '5:00 PM - 10:00 PM',
      location: 'Albertville, AL',
      address: 'Albertville Fairgrounds, Albertville, AL 35950',
      imageUrl: 'https://cdn.abacus.ai/images/15ad9442-f37e-43ab-988f-cc8c3e59e997.png',
      price: 'VIP $15 / Spectator $5',
      featured: true,
      category: 'TRUCK_SHOW',
      status: 'UPCOMING',
    },
    {
      id: 'evt-night-cruise-2026',
      title: 'Night Cruise & Meet',
      description: 'Evening cruise through downtown followed by a laid-back truck meet under the lights. All vehicles welcome. Awards for Best Lifted, Best Custom, and Best Overall.',
      date: new Date('2026-08-23T19:00:00'),
      time: '7:00 PM - 11:00 PM',
      location: 'Fort Payne, AL',
      address: 'DeKalb Centre, Fort Payne, AL 35967',
      imageUrl: 'https://cdn.abacus.ai/images/441d8500-6ef1-4a6d-8ebc-1740b4664e66.png',
      price: 'FREE Entry',
      featured: false,
      category: 'TRUCK_MEET',
      status: 'UPCOMING',
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: event,
      create: event,
    });
  }
  console.log(`Seeded ${events.length} events`);

  // --- Gallery Images ---
  const galleryImages = [
    {
      id: 'gal-chevy-silverado',
      title: 'Lifted Chevy Silverado',
      description: 'Black lifted Chevy Silverado with chrome details at the CMG Spring Meet',
      imageUrl: 'https://cdn.abacus.ai/images/3c953f88-b45e-41fc-9190-dc4eed51393b.png',
      eventName: 'CMG Spring Meet 2025',
      category: 'LIFTED',
    },
    {
      id: 'gal-ford-f150-led',
      title: 'Custom F-150 LED Show',
      description: 'Ford F-150 with custom LED lighting setup at night',
      imageUrl: 'https://cdn.abacus.ai/images/bfdb9400-1dfb-43b7-84cc-16e4ec66a45c.png',
      eventName: 'Night Cruise 2025',
      category: 'CUSTOM',
    },
    {
      id: 'gal-diesel-rolling',
      title: 'Diesel Rolling Coal',
      description: 'Modified diesel truck putting on a show at the outdoor event',
      imageUrl: 'https://cdn.abacus.ai/images/7d0d0f78-d4d2-455b-b6fa-dc0f594da7ea.png',
      eventName: 'CMG Summer Showdown 2025',
      category: 'DIESEL',
    },
    {
      id: 'gal-row-trucks',
      title: 'Truck Row at the Meet',
      description: 'Row of lifted trucks lined up at the CMG truck meet',
      imageUrl: 'https://cdn.abacus.ai/images/5d61b244-aaca-46b6-ae66-882e2dfa7310.png',
      eventName: 'CMG Spring Meet 2025',
      category: 'GENERAL',
    },
    {
      id: 'gal-classic-truck',
      title: 'Classic Vintage Pickup',
      description: 'Restored classic cherry red pickup truck on display',
      imageUrl: 'https://cdn.abacus.ai/images/a787201b-f099-452b-9e63-9f519fb49dfc.png',
      eventName: 'CMG Fall Classic 2025',
      category: 'CLASSIC',
    },
    {
      id: 'gal-custom-4x4',
      title: 'Custom 4x4 Off-Road Build',
      description: 'Massive lifted 4x4 truck with off-road tires',
      imageUrl: 'https://cdn.abacus.ai/images/591552dd-c477-48e6-99b3-1ad9ab950ef7.png',
      eventName: 'CMG Summer Showdown 2025',
      category: 'LIFTED',
    },
    {
      id: 'gal-trophy-ceremony',
      title: 'Award Ceremony',
      description: 'Winners receiving trophies at the CMG truck show awards',
      imageUrl: 'https://cdn.abacus.ai/images/1553726a-3dc7-4ef4-99df-c1e7aa9fee29.png',
      eventName: 'CMG Spring Meet 2025',
      category: 'GENERAL',
      featured: true,
    },
    {
      id: 'gal-crowd-event',
      title: 'Event Crowd Shot',
      description: 'Enthusiasts checking out trucks at the CMG meet',
      imageUrl: 'https://cdn.abacus.ai/images/5427e8b3-8b13-43fa-bd13-539c39de79df.png',
      eventName: 'CMG Spring Meet 2025',
      category: 'GENERAL',
    },
  ];

  for (const img of galleryImages) {
    await prisma.galleryImage.upsert({
      where: { id: img.id },
      update: img,
      create: img,
    });
  }
  console.log(`Seeded ${galleryImages.length} gallery images`);

  // --- Merchandise ---
  const merchItems = [
    {
      id: 'merch-cmg-tshirt',
      name: 'CMG Productionz Logo Tee',
      description: 'Black cotton t-shirt with the official CMG Productionz logo. Available in S-3XL.',
      price: 25.00,
      imageUrl: 'https://cdn.abacus.ai/images/a1998514-2a09-4b52-bfb1-bd5fc9ee6ef0.png',
      category: 'APPAREL',
      inStock: true,
      featured: true,
    },
    {
      id: 'merch-cmg-hoodie',
      name: 'CMG Productionz Hoodie',
      description: 'Premium black hoodie with embroidered CMG logo. Perfect for truck meet nights.',
      price: 45.00,
      imageUrl: 'https://cdn.abacus.ai/images/955de620-7bc1-446e-892a-c0a6ca185192.png',
      category: 'APPAREL',
      inStock: true,
      featured: true,
    },
    {
      id: 'merch-cmg-sticker-pack',
      name: 'CMG Sticker Pack',
      description: 'Pack of 5 die-cut vinyl stickers featuring CMG Productionz designs. Weatherproof.',
      price: 10.00,
      imageUrl: 'https://cdn.abacus.ai/images/805ab2b1-7ebc-4aff-985d-50ddb2b9c7c9.png',
      category: 'STICKERS',
      inStock: true,
      featured: true,
    },
    {
      id: 'merch-cmg-decal',
      name: 'CMG Window Decal',
      description: 'Large vinyl window decal for your truck. Show your CMG pride on the road.',
      price: 8.00,
      imageUrl: 'https://cdn.abacus.ai/images/db43ef74-b0bb-4274-b79d-b2a8f4204993.png',
      category: 'STICKERS',
      inStock: true,
    },
  ];

  for (const item of merchItems) {
    await prisma.merchItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log(`Seeded ${merchItems.length} merch items`);

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: any) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
