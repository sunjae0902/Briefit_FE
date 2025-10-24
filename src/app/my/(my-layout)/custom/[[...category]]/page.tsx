import { MyNewsType } from "@/constants/myNewsType";
import { newsCategories } from "@/constants/newsCategries";
import MyNews from "@/features/my/components/MyNews";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function MyCustomPage(props: Props) {
  const { category } = await props.params;
  const categoryLabel = category
    ? (newsCategories.find((e) => e.name === category[0])?.label ?? null)
    : null;

  return (
    <div>
      <MyNews myNewsType={MyNewsType.CUSTOM} categoryLabel={categoryLabel} />
    </div>
  );
}
