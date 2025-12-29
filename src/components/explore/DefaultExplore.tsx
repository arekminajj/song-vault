import Section from "./Section";

export default function DefaultExplore() {
  return (
    <>
      <Section title="Popular Tracks">
        <div className="text-gray-400">Popular Tracks</div>
      </Section>

      <Section title="Trending Artists">
        <div className="text-gray-400">Trending artists</div>
      </Section>

      <Section title="Featured Albums">
        <div className="text-gray-400">Featured albums</div>
      </Section>
    </>
  );
}
