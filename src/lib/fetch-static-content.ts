interface StaticContent {
  key: string;
  value: {
    title: {
      prefix: string;
      highlight: string;
      suffix: string;
    };
    description: string;
  };
}

export const fetchStaticContent = (
  key: string,
  staticContentList: StaticContent[] | null | undefined | unknown,
) => {
  if (!staticContentList || !Array.isArray(staticContentList)) return;
  return staticContentList.find(
    (content: StaticContent) => content.key === key,
  );
};
