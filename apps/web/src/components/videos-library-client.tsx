"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Field } from "@/components/ui";
import { EmptyState, SelectField } from "@/components/content-ui";
import { VideoThumbnail } from "@/components/video-thumbnail";
import type { Topic, Video } from "@/lib/content/types";

type Filters = {
  level: string;
  query: string;
  topic: string;
};

const emptyFilters: Filters = { level: "", query: "", topic: "" };

export function VideosLibraryClient({
  topics,
  videos,
}: {
  topics: Topic[];
  videos: Video[];
}) {
  const [draft, setDraft] = useState<Filters>(emptyFilters);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const filteredVideos = useMemo(() => {
    const needle = filters.query.trim().toLocaleLowerCase();

    return videos.filter(
      (video) =>
        (!filters.topic || video.topicSlug === filters.topic) &&
        (!filters.level || video.level === filters.level) &&
        (!needle ||
          `${video.title} ${video.summary}`
            .toLocaleLowerCase()
            .includes(needle)),
    );
  }, [filters, videos]);

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFilters(draft);
  }

  function clearFilters() {
    setDraft(emptyFilters);
    setFilters(emptyFilters);
  }

  return (
    <>
      <form
        aria-label="Search and filter videos"
        className="filter-bar"
        onSubmit={applyFilters}
      >
        <Field
          id="video-query"
          label="Search videos"
          name="q"
          onChange={(event) =>
            setDraft((current) => ({ ...current, query: event.target.value }))
          }
          placeholder="Search lessons"
          type="search"
          value={draft.query}
        />
        <SelectField
          label="Topic"
          name="topic"
          onChange={(value) =>
            setDraft((current) => ({ ...current, topic: value }))
          }
          value={draft.topic}
        >
          <option value="">All topics</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.slug}>
              {topic.title}
            </option>
          ))}
        </SelectField>
        <SelectField
          label="Level"
          name="level"
          onChange={(value) =>
            setDraft((current) => ({ ...current, level: value }))
          }
          value={draft.level}
        >
          <option value="">All levels</option>
          <option>Foundations</option>
          <option>Developing</option>
          <option>Advanced</option>
        </SelectField>
        <button className="button button--primary" type="submit">
          Apply filters
        </button>
        <Link
          className="button button--quiet"
          href="?"
          onClick={(event) => {
            event.preventDefault();
            clearFilters();
          }}
        >
          Clear
        </Link>
      </form>

      <p aria-live="polite" className="filter-results-count">
        {filteredVideos.length}{" "}
        {filteredVideos.length === 1 ? "video" : "videos"}
      </p>

      {filteredVideos.length ? (
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <article
              data-level={video.level}
              data-topic={video.topicSlug}
              key={video.id}
            >
              <div className="video-facade">
                <VideoThumbnail
                  className="video-facade__image"
                  title={video.title}
                  youtubeUrl={video.youtubeUrl}
                />
                <span className="video-facade__play" aria-hidden="true" />
                <small>{video.duration}</small>
              </div>
              <p className="eyebrow">{video.series ?? "Video lesson"}</p>
              <h2>
                <Link href={`/videos/${video.slug}`}>{video.title}</Link>
              </h2>
              <p>{video.summary}</p>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          actionHref="/videos"
          actionLabel="View all videos"
          message="Adjust the search, topic, or level to see another set."
          title="No videos match."
        />
      )}
    </>
  );
}
