export enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export enum MBTI {
  INTJ = 1,
  INTP,
  ENTJ,
  ENTP,
  INFJ,
  INFP,
  ENFJ,
  ENFP,
  ISTJ,
  ISFJ,
  ESTJ,
  ESFJ,
  ISTP,
  ISFP,
  ESTP,
  ESFP,
}

export const Department = {
  SINHAK: { id: 1, name: "신학과" },
  MEDIA: { id: 2, name: "미디어영상광고학과" },
  MANAGEMENT: { id: 3, name: "경영학과" },
  POLICE: { id: 4, name: "경찰행정학과" },
  TOURISM: { id: 5, name: "국제관광학과" },
  ENGLISH: { id: 6, name: "영어학과" },
  CHINESE: { id: 7, name: "중국어학과" },
  COMPUTER: { id: 8, name: "컴퓨터공학과" },
  SECURITY: { id: 9, name: "융합보안학과" },
  NURSING: { id: 10, name: "간호학과" },
  SOCIAL_WELFARE: { id: 11, name: "사회복지학과" },
  MUSIC: { id: 12, name: "음악학과" },
  PERFORMING_ARTS: { id: 13, name: "공연예술학과" },
  VISUAL_DESIGN: { id: 14, name: "시각정보디자인학과" },
  INTERIOR_DESIGN: { id: 15, name: "실내건축디자인학과" },
  FASHION_DESIGN: { id: 16, name: "섬유패션디자인학과" },
  FREE_MAJOR: { id: 17, name: "자유전공학부" },
  IT_MAJOR: { id: 18, name: "IT학부" },
  DESIGN_MAJOR: { id: 19, name: "디자인학부" },
};

// // Type for the Department object values
// export type DepartmentValue = (typeof Department)[keyof typeof Department];
