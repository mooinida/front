import React from 'react' // 리액트 컴포넌트에서 JSX문법을 사용하기 위해 필수  import

interface CardProps { //card와 CardContent에서 사용할 props 타입 정의
  children: React.ReactNode // jsx안에 감싸질 내용(필수)
  className?: string // Tailwind 등에서 쓸 CSS 클래스명(선택)
}

export function Card({ children }: CardProps) {
  return (
    <div className="border rounded shadow-sm bg-white w-full max-w-sm mx-auto">
      {children}
    </div>
  );
}


export function CardContent({ children, className = "" }: CardProps) {
  return (
    <div className={`p-4 flex flex-col items-center text-center ${className}`}>
      {children}
    </div>
  );
}
