import {
  PrismaClient,
  AccountType,
  UserRole,
  ListingType,
  PlanId,
  SubscriptionStatus,
  NotificationType,
} from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const DEFAULT_PASSWORD = "Password123!";

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.watchedItem.deleteMany();
  await prisma.listingImage.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.adBumpCredit.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.pressArticle.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.communityProject.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  // ─── Users ──────────────────────────────────────────────────────────────────

  const _admin = await prisma.user.create({
    data: {
      email: "admin@enviromate.co.uk",
      passwordHash,
      firstName: "Admin",
      lastName: "User",
      postcode: "SW1A 1AA",
      postcodeNorm: "SW1A1AA",
      role: UserRole.ADMIN,
      accountType: AccountType.INDIVIDUAL,
      occupation: "Site Manager",
    },
  });

  const sarah = await prisma.user.create({
    data: {
      email: "sarah@example.com",
      passwordHash,
      firstName: "Sarah",
      lastName: "Mitchell",
      postcode: "M1 1AE",
      postcodeNorm: "M11AE",
      accountType: AccountType.INDIVIDUAL,
      occupation: "Plumber",
      phone: "07700900001",
    },
  });

  const tom = await prisma.user.create({
    data: {
      email: "tom@example.com",
      passwordHash,
      firstName: "Tom",
      lastName: "Williams",
      postcode: "B1 1BB",
      postcodeNorm: "B11BB",
      accountType: AccountType.INDIVIDUAL,
      occupation: "Electrician",
    },
  });

  const james = await prisma.user.create({
    data: {
      email: "james@builderswarehouse.co.uk",
      passwordHash,
      firstName: "James",
      lastName: "Carter",
      postcode: "LS1 1BA",
      postcodeNorm: "LS11BA",
      accountType: AccountType.WHOLESALER,
      businessName: "Carter Building Supplies",
      businessType: "Building Materials Supplier",
      occupation: "Business Owner",
      phone: "07700900002",
    },
  });

  // ─── Subscriptions ────────────────────────────────────────────────────────

  const now = new Date();
  const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  await prisma.subscription.create({
    data: {
      userId: sarah.id,
      plan: PlanId.PREMIUM,
      status: SubscriptionStatus.ACTIVE,
      currentPeriodStart: now,
      currentPeriodEnd: monthFromNow,
    },
  });

  await prisma.subscription.create({
    data: {
      userId: james.id,
      plan: PlanId.WHOLESALER,
      status: SubscriptionStatus.ACTIVE,
      currentPeriodStart: now,
      currentPeriodEnd: monthFromNow,
    },
  });

  // ─── Ad Bump Credits ─────────────────────────────────────────────────────

  await prisma.adBumpCredit.create({
    data: {
      userId: sarah.id,
      totalCredits: 5,
      usedCredits: 1,
      periodStart: now,
      periodEnd: monthFromNow,
    },
  });

  await prisma.adBumpCredit.create({
    data: {
      userId: james.id,
      totalCredits: 10,
      usedCredits: 3,
      periodStart: now,
      periodEnd: monthFromNow,
    },
  });

  // ─── Listings ─────────────────────────────────────────────────────────────

  const listings = await Promise.all([
    prisma.listing.create({
      data: {
        title: "Reclaimed Victorian Bricks - 500 Available",
        description:
          "Beautiful reclaimed Victorian bricks from a period property demolition in Manchester. These are hard red stock bricks in excellent condition. Cleaned and stacked on pallets. Perfect for extensions, garden walls, or matching existing brickwork. Collection only from M1 postcode area.",
        price: 7500, // £75.00
        listingType: ListingType.FOR_SALE,
        category: "building",
        condition: "Used - Good",
        postcode: "M1 1AE",
        lat: 53.4808,
        lng: -2.2426,
        userId: sarah.id,
        viewCount: 42,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Copper Pipe Offcuts - Mixed Sizes",
        description:
          "Leftover copper pipe from a bathroom refurbishment. Mix of 15mm and 22mm pipes, various lengths from 30cm to 1.5m. About 20 pieces total. Would be useful for small plumbing jobs or practice. Collection from Birmingham.",
        price: 0,
        listingType: ListingType.FREE,
        category: "plumbing",
        postcode: "B1 1BB",
        lat: 52.4862,
        lng: -1.8904,
        userId: tom.id,
        viewCount: 18,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Oak Floorboards - 25sqm Engineered",
        description:
          "Surplus engineered oak floorboards from a living room renovation. 25 square metres available, 18mm thick with a 4mm oak veneer. Natural finish, tongue and groove fitting. Still in original packaging. Buyer to collect.",
        price: 35000, // £350.00
        listingType: ListingType.FOR_SALE,
        category: "carpentry",
        condition: "New",
        postcode: "M1 1AE",
        lat: 53.4808,
        lng: -2.2426,
        userId: sarah.id,
        viewCount: 67,
      },
    }),
    prisma.listing.create({
      data: {
        title: "LED Downlight Pack - 10x GU10 Fittings",
        description:
          "Pack of 10 fire-rated LED downlight fittings with GU10 LED bulbs included. Brushed chrome finish. IP65 rated for bathroom use. Never installed - wrong colour chosen for our project. Dimmable, 5W warm white.",
        price: 4500, // £45.00
        listingType: ListingType.FOR_SALE,
        category: "electrical",
        condition: "New",
        postcode: "LS1 1BA",
        lat: 53.7996,
        lng: -1.5491,
        userId: james.id,
        viewCount: 23,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Dulux Trade White Paint - 10L Tins x3",
        description:
          "Three 10-litre tins of Dulux Trade Diamond Matt in Pure Brilliant White. Bought too much for our project. Sealed and unopened. RRP £55 per tin. Will sell together or separately.",
        price: 9000, // £90.00
        listingType: ListingType.FOR_SALE,
        category: "paint-decorating",
        condition: "New",
        postcode: "B1 1BB",
        lat: 52.4862,
        lng: -1.8904,
        userId: tom.id,
        viewCount: 31,
      },
    }),
    prisma.listing.create({
      data: {
        title: "DeWalt Cordless Drill Set - Used",
        description:
          "DeWalt DCD776 cordless drill driver with two 18V 1.3Ah batteries, charger, and carry case. About 2 years old, used on domestic projects only. Still works perfectly, just upgrading to a newer model. All accessories included.",
        price: 5500, // £55.00
        listingType: ListingType.FOR_SALE,
        category: "tools",
        condition: "Used - Good",
        postcode: "M1 1AE",
        lat: 53.4808,
        lng: -2.2426,
        userId: sarah.id,
        viewCount: 89,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Free Broken Concrete - Ideal for Hardcore",
        description:
          "Large quantity of broken concrete from a patio demolition. Ideal for use as hardcore/sub-base material. You will need a vehicle to collect. Available immediately. Located in Leeds city centre.",
        price: 0,
        listingType: ListingType.FREE,
        category: "free",
        postcode: "LS1 1BA",
        lat: 53.7996,
        lng: -1.5491,
        userId: james.id,
        viewCount: 14,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Scaffold Tower - Boss BoSS Clima",
        description:
          "Boss BoSS Clima aluminium scaffold tower. Working height up to 6.2m. Includes all braces, platforms, and outriggers. Very well maintained. Moving to a smaller van so need to downsize equipment.",
        price: 85000, // £850.00
        listingType: ListingType.FOR_SALE,
        category: "tools",
        condition: "Used - Fair",
        postcode: "M1 1AE",
        lat: 53.4808,
        lng: -2.2426,
        userId: sarah.id,
        viewCount: 156,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Assorted Plumbing Fittings - Box Lot",
        description:
          "Large box of assorted plumbing fittings. Includes elbows, tees, couplings, valves in both 15mm and 22mm copper and push-fit. Also some waste fittings. Clearing out the van. Everything must go.",
        price: 2500, // £25.00
        listingType: ListingType.FOR_SALE,
        category: "plumbing",
        condition: "Used - Good",
        postcode: "B1 1BB",
        lat: 52.4862,
        lng: -1.8904,
        userId: tom.id,
        viewCount: 27,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Wholesale: Cement 25kg bags x100",
        description:
          "Bulk order of Portland cement. 100 bags of 25kg each. Major brand, fresh stock with 6 month shelf life remaining. Trade pricing available for repeat orders. Delivery can be arranged within 30 miles of Leeds.",
        price: 45000, // £450.00
        listingType: ListingType.FOR_SALE,
        category: "wholesalers",
        condition: "New",
        postcode: "LS1 1BA",
        lat: 53.7996,
        lng: -1.5491,
        userId: james.id,
        viewCount: 72,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Roof Tiles - Marley Modern (200+)",
        description:
          "Over 200 Marley Modern concrete roof tiles in good condition. Removed during a re-roofing project. Smooth grey finish. Some minor weathering but structurally sound. Great for repairs or small outbuildings.",
        price: 10000, // £100.00
        listingType: ListingType.FOR_SALE,
        category: "building",
        condition: "Used - Fair",
        postcode: "LS1 1BA",
        lat: 53.7996,
        lng: -1.5491,
        userId: james.id,
        viewCount: 38,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Leftover Bathroom Tiles - Free",
        description:
          "About 3 square metres of white ceramic wall tiles, 200x250mm. Left over from a bathroom renovation. Would be enough for a small splashback or to patch an existing tiled area. Free to anyone who can collect.",
        price: 0,
        listingType: ListingType.FREE,
        category: "building",
        postcode: "M1 1AE",
        lat: 53.4808,
        lng: -2.2426,
        userId: sarah.id,
        viewCount: 11,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Electrical Cable - Twin & Earth 2.5mm 100m",
        description:
          "Full 100m drum of 2.5mm twin and earth cable. BS 6004 compliant. Unopened, still factory sealed. Surplus from a rewiring project. Perfect for ring mains or radial circuits.",
        price: 6500, // £65.00
        listingType: ListingType.FOR_SALE,
        category: "electrical",
        condition: "New",
        postcode: "B1 1BB",
        lat: 52.4862,
        lng: -1.8904,
        userId: tom.id,
        viewCount: 44,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Garden Decking Boards - Treated Softwood",
        description:
          "20 treated softwood decking boards, 3.6m long, 32x150mm. Pressure treated green. Some slight bowing on a couple of boards but perfectly usable. Selling as we changed our garden design plans.",
        price: 12000, // £120.00
        listingType: ListingType.FOR_SALE,
        category: "carpentry",
        condition: "New",
        postcode: "LS1 1BA",
        lat: 53.7996,
        lng: -1.5491,
        userId: james.id,
        viewCount: 55,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Miscellaneous Fixings & Fasteners",
        description:
          "Collection of various fixings and fasteners: screws, nails, wall plugs, bolts, brackets. Accumulated over many projects. Mostly part-used boxes but plenty of useful stuff. Save yourself trips to the hardware shop.",
        price: 0,
        listingType: ListingType.FREE,
        category: "other",
        postcode: "B1 1BB",
        lat: 52.4862,
        lng: -1.8904,
        userId: tom.id,
        viewCount: 8,
      },
    }),
  ]);

  // ─── Listing Images ───────────────────────────────────────────────────────

  for (const listing of listings) {
    await prisma.listingImage.create({
      data: {
        listingId: listing.id,
        url: `https://placehold.co/800x600/16a34a/ffffff?text=${encodeURIComponent(listing.title.slice(0, 20))}`,
        key: `listings/${listing.id}/image-0.jpg`,
        order: 0,
      },
    });
  }

  // ─── Watched Items ────────────────────────────────────────────────────────

  await prisma.watchedItem.createMany({
    data: [
      { userId: tom.id, listingId: listings[0].id }, // Tom watches Sarah's bricks
      { userId: tom.id, listingId: listings[2].id }, // Tom watches Sarah's floorboards
      { userId: sarah.id, listingId: listings[3].id }, // Sarah watches James's downlights
      { userId: james.id, listingId: listings[5].id }, // James watches Sarah's drill
    ],
  });

  // ─── Conversations & Messages ─────────────────────────────────────────────

  const convo1 = await prisma.conversation.create({
    data: {
      listingId: listings[0].id,
      buyerId: tom.id,
      sellerId: sarah.id,
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: convo1.id,
        senderId: tom.id,
        content:
          "Hi Sarah, are the Victorian bricks still available? I need about 200 for a garden wall project in Edgbaston.",
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      },
      {
        conversationId: convo1.id,
        senderId: sarah.id,
        content:
          "Hi Tom! Yes they are. I can do 200 for £30 if you collect. They are cleaned and ready to go. When suits you?",
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      },
      {
        conversationId: convo1.id,
        senderId: tom.id,
        content: "That sounds great! Would Saturday morning work? I can bring the van around 10am.",
        createdAt: new Date(now.getTime() - 30 * 60 * 1000),
      },
    ],
  });

  const convo2 = await prisma.conversation.create({
    data: {
      listingId: listings[3].id,
      buyerId: sarah.id,
      sellerId: james.id,
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: convo2.id,
        senderId: sarah.id,
        content:
          "Hi James, interested in the LED downlights. Are these IP65 rated? Need them for a bathroom job.",
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      },
      {
        conversationId: convo2.id,
        senderId: james.id,
        content:
          "Yes they are IP65 rated, perfect for bathrooms. They are also dimmable if that helps. Happy to do £40 for a quick sale.",
        createdAt: new Date(now.getTime() - 23 * 60 * 60 * 1000),
        readAt: new Date(now.getTime() - 22 * 60 * 60 * 1000),
      },
    ],
  });

  // ─── Notifications ────────────────────────────────────────────────────────

  await prisma.notification.createMany({
    data: [
      {
        userId: sarah.id,
        type: NotificationType.NEW_MESSAGE,
        title: "New message from Tom",
        message: "Tom sent you a message about Victorian Bricks",
        metadata: { conversationId: convo1.id, listingId: listings[0].id },
      },
      {
        userId: tom.id,
        type: NotificationType.LISTING_EXPIRED,
        title: "Listing expiring soon",
        message: "Your listing 'Copper Pipe Offcuts' will expire in 3 days",
        metadata: { listingId: listings[1].id },
      },
      {
        userId: sarah.id,
        type: NotificationType.SUBSCRIPTION_RENEWED,
        title: "Subscription renewed",
        message: "Your Premium subscription has been renewed for another month",
        readAt: new Date(now.getTime() - 48 * 60 * 60 * 1000),
      },
      {
        userId: james.id,
        type: NotificationType.AD_BUMP_AVAILABLE,
        title: "Bump credits available",
        message: "You have 7 ad bump credits remaining this month",
      },
      {
        userId: tom.id,
        type: NotificationType.SYSTEM,
        title: "Welcome to Enviromate!",
        message:
          "Thanks for joining the UK's building materials marketplace. Start browsing or post your first free ad.",
        readAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  // ─── Blog Posts ───────────────────────────────────────────────────────────

  await prisma.blogPost.createMany({
    data: [
      {
        title: "5 Ways to Save Money on Your Next Renovation",
        slug: "5-ways-save-money-renovation",
        excerpt:
          "Renovating your home doesn't have to break the bank. Here are five practical tips to keep costs down while achieving great results.",
        content:
          "## 1. Source Reclaimed Materials\n\nReclaimed building materials are not only more affordable but also more sustainable. Platforms like Enviromate make it easy to find quality second-hand building supplies in your area.\n\n## 2. Plan Before You Buy\n\nMeasure twice, buy once. Careful planning prevents over-ordering and waste.\n\n## 3. Compare Trade Prices\n\nDon't just accept the first quote. Compare prices from multiple suppliers and consider bulk buying for bigger projects.\n\n## 4. Do What You Can Yourself\n\nSimple tasks like demolition, painting, and basic landscaping can be done without professional help.\n\n## 5. Time Your Purchases\n\nBuilding materials often go on sale at the end of seasons or during bank holiday weekends.",
        author: "Enviromate Team",
        publishedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
      },
      {
        title: "The Environmental Impact of Construction Waste in the UK",
        slug: "environmental-impact-construction-waste-uk",
        excerpt:
          "Construction and demolition waste makes up a third of all waste in the UK. Here's what we can do about it.",
        content:
          "The UK construction industry generates approximately 62 million tonnes of waste annually, making it the largest waste-producing sector in the country.\n\n## The Problem\n\nMuch of this waste ends up in landfill, despite being perfectly reusable. Materials like bricks, timber, metal, and plumbing supplies are routinely discarded when they could have a second life.\n\n## The Solution\n\nCircular economy principles applied to construction materials can significantly reduce this waste. By facilitating the exchange of surplus and reclaimed building materials, we can keep valuable resources in use for longer.\n\n## How Enviromate Helps\n\nEnviromate connects people who have surplus building materials with those who need them. Whether it's leftover tiles from a bathroom renovation or reclaimed timber from a demolition, every material reused is one less going to landfill.",
        author: "Enviromate Team",
        publishedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Getting Started with Enviromate: A Seller's Guide",
        slug: "getting-started-sellers-guide",
        excerpt:
          "Learn how to list your surplus building materials and start selling on Enviromate.",
        content:
          "## Creating Your First Listing\n\nSelling on Enviromate is straightforward. Here's a step-by-step guide to creating your first listing.\n\n### Step 1: Sign Up\n\nCreate a free account with just your email and postcode.\n\n### Step 2: Take Good Photos\n\nClear, well-lit photos from multiple angles help buyers make confident decisions.\n\n### Step 3: Write a Detailed Description\n\nInclude dimensions, quantities, condition, and any relevant brand information.\n\n### Step 4: Set a Fair Price\n\nCheck similar listings on Enviromate to price competitively. Or list for free to clear space quickly.\n\n### Step 5: Respond Promptly\n\nBuyers appreciate quick responses. Use our messaging system to arrange collection details.",
        author: "Enviromate Team",
        publishedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  // ─── Press Articles ───────────────────────────────────────────────────────

  await prisma.pressArticle.createMany({
    data: [
      {
        title: "Enviromate: The Marketplace Tackling Construction Waste",
        url: "https://example.com/press/enviromate-construction-waste",
        source: "Construction News",
        publishedDate: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
      },
      {
        title: "UK Startup Helps Tradespeople Save Money on Materials",
        url: "https://example.com/press/uk-startup-tradespeople",
        source: "The Builder's Merchant Journal",
        publishedDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  // ─── Partners ─────────────────────────────────────────────────────────────

  await prisma.partner.createMany({
    data: [
      {
        name: "Green Building Council",
        description: "Supporting sustainable building practices across the UK",
        order: 0,
      },
      {
        name: "Circular Economy Alliance",
        description: "Promoting circular economy principles in construction",
        order: 1,
      },
      {
        name: "TradeSkills UK",
        description: "Training and development for UK tradespeople",
        order: 2,
      },
    ],
  });

  // ─── Community Projects ───────────────────────────────────────────────────

  await prisma.communityProject.createMany({
    data: [
      {
        title: "Manchester Community Garden Rebuild",
        description:
          "Local volunteers used reclaimed bricks and timber from Enviromate to rebuild a community garden wall and raised beds in Moss Side.",
        images: [
          "https://placehold.co/800x600/16a34a/ffffff?text=Garden+Project+1",
          "https://placehold.co/800x600/16a34a/ffffff?text=Garden+Project+2",
        ],
        location: "Manchester",
      },
      {
        title: "Leeds Youth Centre Renovation",
        description:
          "A youth centre in Headingley was renovated using donated and discounted materials sourced through the Enviromate platform.",
        images: ["https://placehold.co/800x600/16a34a/ffffff?text=Youth+Centre+1"],
        location: "Leeds",
      },
    ],
  });

  console.log("✅ Seed complete!");
  console.log(`   Users: 4 (admin, sarah, tom, james)`);
  console.log(`   Listings: ${listings.length}`);
  console.log(`   Conversations: 2`);
  console.log(`   Blog posts: 3`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
