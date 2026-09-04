import { useMemo } from "react";
import { Link } from "react-router-dom";

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[/&]/g, "")
    .replace(/\s+/g, "-");
}

export default function SearchResults({
  data,
  query,
  limit = 8,
  showAllWhenEmpty = false,
}) {
  const flatData = useMemo(() => {
    return Object.entries(data).flatMap(([key, category]) =>
      category.programs.map((p) => ({
        ...p,
        categoryKey: key,
        categoryTitle: category.title,
      }))
    );
  }, [data]);

  const results = useMemo(() => {
    if (!query?.trim()) {
      return showAllWhenEmpty ? flatData : [];
    }

    const q = query.toLowerCase();

    return flatData
      .map((item) => {
        let score = 0;

        const course = item.course?.toLowerCase() || "";
        const categoryTitle = item.categoryTitle?.toLowerCase() || "";
        const description = item.description?.toLowerCase() || "";

        if (course.includes(q)) score += 3;
        if (categoryTitle.includes(q)) score += 2;
        if (description.includes(q)) score += 1;

        return { item, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((x) => x.item);
  }, [query, flatData, limit, showAllWhenEmpty]);

  if (!query?.trim() && !showAllWhenEmpty) return null;

  if (results.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        {query?.trim() ? "No results found." : "No courses available."}
      </div>
    );
  }

  return (
    <div className="mt-3 max-h-80 overflow-y-auto">
      {results.map((item, i) => (
        <Link
          key={`${item.course}-${i}`}
          to={`/programs/${item.categoryKey}/${slugify(item.course)}`}
          className="block p-3 border-b hover:bg-gray-50"
        >
          <div className="font-bold">{item.course}</div>

          <div className="text-xs text-gray-500">
            {item.categoryTitle}
          </div>

          <div className="text-xs opacity-70">
            {item.description}
          </div>

          <div className="text-xs mt-1 text-amber-600">
            {item.duration} • KES {item.feePerMonth.toLocaleString()}/month
          </div>
        </Link>
      ))}
    </div>
  );
}