import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SearchKeywords() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>검색어 순위</CardTitle>
        <CardDescription>2024. 1. 1 ~ 2024. 1. 7</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='font-pretendard h-full text-lg font-semibold'>
          <li>1. next.js</li>
          <li>2. react</li>
          <li>3. css</li>
          <li>4. tailwind</li>
          <li>5. cookie</li>
        </ul>
      </CardContent>
      <CardFooter className='text-sm'>지난 7일간 검색어 순위</CardFooter>
    </Card>
  );
}
