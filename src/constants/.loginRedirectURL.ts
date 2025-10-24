/// 🏷️ 해당 파일은 커밋에 포함하지 말 것

enum RedirectType {
    Prod = "",
    Local = "?client-type=local",
    Mobile = "?client-type=mobile"
}

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

const currentType = RedirectType.Local; // 테스트 환경에 따라 바꿔주세요

export const loginRedirectURL = `${baseUrl}/oauth2/authorization/naver${currentType}`;
