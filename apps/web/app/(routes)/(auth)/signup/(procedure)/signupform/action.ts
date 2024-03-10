'use server';
// 회원 가입
export async function SignUpSubmitAction(formData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    return false;
  }
}

export interface CheckDuplicationProps {
  type: 'email' | 'username' | 'nickname';
  data: string;
}

export async function CheckDuplication(
  type: CheckDuplicationProps['type'],
  data: CheckDuplicationProps['data'],
): Promise<{ isDuplicate?: boolean; error?: boolean }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup/check?type=${type}&data=${data}`,
      { cache: 'no-cache' },
    );
    if (!response.ok) throw new Error();
    const result = await response.json();
    if (result.isDuplicate === true) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
  } catch (err: any) {
    return { error: true };
  }
}
