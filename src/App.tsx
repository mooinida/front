// RestaurantFinder.tsx
import { useState } from "react";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
import { Card, CardContent } from "./components/ui/Card";
import { fetchAnswer } from "./lib/api";

function SearchPage({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <section className="relative h-[500px] w-full">
      {/* 이미지 로딩 실패 시 대체 배경 색 지정 */}
      <img
        src="/images/header-food.jpg"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          document.body.style.backgroundColor = "#f0f0f0";
        }}
        alt="배경"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-md">
          서울 성북구 및 시내 중심 맛집 검색
        </h1>
      </div>
      <div className="absolute bottom-[-48px] left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-wrap gap-4 justify-center items-center text-black text-center">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="성북구 혹은 시내 중심 음식점 검색"
            className="flex-1 min-w-[200px]"
          />
          <input type="date" className="border px-3 py-2 rounded" />
          <input type="time" className="border px-3 py-2 rounded" />
          <select className="border px-3 py-2 rounded">
            <option>2명</option>
            <option>3명</option>
            <option>4명</option>
          </select>
          <Button
            onClick={() => onSearch(query)}
            className="bg-green-600 hover:bg-green-700"
          >
            검색
          </Button>
        </div>
      </div>
    </section>
  );
}

function ResultsPage({ results }: { results: string[] }) {
  if (!results || results.length === 0)
    return <p className="text-center text-gray-500 mt-20">🔎 결과가 없습니다.</p>;

  return (
    <section className="px-4 pt-24 pb-8 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">LangChain 기반 추천 결과</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-items-center">
        {results.map((text, i) => (
          <Card key={i} className="w-full max-w-xl">
            <CardContent className="p-4 text-sm whitespace-pre-line">{text}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function RestaurantFinder() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query) {
      alert("검색어를 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      const responseText = await fetchAnswer(query);
      const lines = responseText?.split(/\n{2,}/) || [];
      setResults(lines.filter((line: string) => line.trim().length > 0));
    } catch (err) {
      console.error("API 오류:", err);
      alert("추천을 불러오는 중 오류가 발생했습니다.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SearchPage onSearch={handleSearch} />
      {loading ? (
        <p className="text-center mt-20 text-lg text-gray-600">⏳ 추천 중입니다...</p>
      ) : (
        <ResultsPage results={results} />
      )}
    </div>
  );
}
