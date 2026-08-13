from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = Path(
    r"C:\Users\joshy\AppData\Local\hermes\Mission Control\artifacts\web-scrapes\moorish-lighthouse\youtube-catalog.json"
)
HELPER = Path(
    r"C:\Users\joshy\AppData\Local\hermes\profiles\tails\skills\media\youtube-content\scripts\fetch_transcript.py"
)
PYTHON = ROOT / ".venv-transcripts" / "Scripts" / "python.exe"
OUTPUT = ROOT / "artifacts" / "transcripts"


def main() -> int:
    videos = json.loads(CATALOG.read_text(encoding="utf-8"))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    inventory = []

    for index, video in enumerate(videos, start=1):
        video_id = video["id"]
        path = OUTPUT / f"{video_id}.json"
        result = subprocess.run(
            [
                str(PYTHON),
                str(HELPER),
                video["webpage_url"],
                "--timestamps",
            ],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=180,
        )
        entry = {
            "id": video_id,
            "title": video["title"],
            "url": video["webpage_url"],
            "status": "unavailable",
            "transcript_path": None,
        }
        if result.returncode == 0 and result.stdout.strip():
            try:
                payload = json.loads(result.stdout)
                path.write_text(
                    json.dumps(payload, ensure_ascii=False, indent=2),
                    encoding="utf-8",
                )
                entry.update(
                    {
                        "status": "available",
                        "transcript_path": str(path.relative_to(ROOT)),
                        "segment_count": payload.get("segment_count", 0),
                        "duration": payload.get("duration"),
                        "character_count": len(payload.get("full_text", "")),
                    }
                )
            except json.JSONDecodeError:
                entry["error"] = "Helper returned invalid JSON"
        else:
            error = result.stderr.strip() or result.stdout.strip() or "Unknown error"
            try:
                parsed = json.loads(result.stdout)
                error = parsed.get("error", error)
            except (json.JSONDecodeError, AttributeError):
                pass
            entry["error"] = error[:1000]
        inventory.append(entry)
        print(f"[{index:02d}/{len(videos)}] {video_id}: {entry['status']}", flush=True)

    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "channel": "Moorish Lighthouse",
        "channel_url": "https://www.youtube.com/@moorishlighthouse",
        "video_count": len(videos),
        "available_count": sum(item["status"] == "available" for item in inventory),
        "unavailable_count": sum(item["status"] != "available" for item in inventory),
        "videos": inventory,
    }
    inventory_path = OUTPUT / "inventory.json"
    inventory_path.write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps({key: value for key, value in summary.items() if key != "videos"}, indent=2))
    return 0 if summary["available_count"] else 1


if __name__ == "__main__":
    sys.exit(main())
