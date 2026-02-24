let counter = 0;

function nextId() {
  counter++;
  return `test-id-${counter}`;
}

export function buildUser(overrides: Record<string, unknown> = {}) {
  return {
    id: nextId(),
    email: `user-${counter}@example.com`,
    firstName: "Test",
    lastName: "User",
    postcode: "SW1A 1AA",
    postcodeNorm: "SW1A1AA",
    accountType: "INDIVIDUAL" as const,
    role: "USER" as const,
    occupation: "Plumber",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function buildListing(overrides: Record<string, unknown> = {}) {
  return {
    id: nextId(),
    title: `Test Listing ${counter}`,
    description: "A test listing description.",
    price: 5000,
    listingType: "FOR_SALE" as const,
    category: "building",
    postcode: "M1 1AE",
    status: "ACTIVE" as const,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: nextId(),
    ...overrides,
  };
}
