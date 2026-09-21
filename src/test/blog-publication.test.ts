import { describe, expect, it } from "vitest";
import { posts, scheduledBlogPosts, publishedPosts } from "@/data/blogPosts";
import { getPublicationDay, isPublicationDateReached } from "@/lib/publication";

const expectedDates = Array.from({ length: 12 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 10 + index, 1));
  return date.toISOString().slice(0, 10);
});

describe("publication mensuelle automatique", () => {
  it("prépare exactement douze articles consécutifs le premier du mois", () => {
    expect(scheduledBlogPosts).toHaveLength(12);
    expect(scheduledBlogPosts.map((post) => post.date)).toEqual(expectedDates);
  });

  it("conserve les futurs articles hors des surfaces publiques", () => {
    expect(posts.length).toBeGreaterThan(publishedPosts.length);
    expect(publishedPosts.every((post) => isPublicationDateReached(post.date))).toBe(true);
  });

  it("publie à minuit en heure française, été comme hiver", () => {
    expect(getPublicationDay(new Date("2027-04-30T22:00:00Z"))).toBe("2027-05-01");
    expect(isPublicationDateReached("2027-05-01", new Date("2027-04-30T22:00:00Z"))).toBe(true);
    expect(getPublicationDay(new Date("2027-01-31T22:59:59Z"))).toBe("2027-01-31");
    expect(getPublicationDay(new Date("2027-01-31T23:00:00Z"))).toBe("2027-02-01");
  });

  it("fournit toutes les métadonnées SEO et les liens attendus", () => {
    for (const post of scheduledBlogPosts) {
      expect(post.seoTitle?.length).toBeGreaterThan(30);
      expect(post.seoDescription?.length).toBeLessThanOrEqual(160);
      expect(post.imageAlt?.length).toBeGreaterThan(30);
      expect(post.content.match(/^## /gm)?.length).toBeGreaterThanOrEqual(6);
      expect(post.content).toContain("](https://");
      expect(post.content).toContain("](/");
      expect(post.content).toContain("Demandez une estimation gratuite");
    }
  });
});
