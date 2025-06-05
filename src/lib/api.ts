export async function fetchAnswer(_: string){
    const res=await fetch('/api/qa?question=#{encodeURIComponent(query)}');
    if(!res.ok) throw new Error("서버 응답 오류");
    const data =await res.json();
    return data.result;
}
