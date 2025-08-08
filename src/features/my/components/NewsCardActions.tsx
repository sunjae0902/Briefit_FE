import IconButton from "@/features/common/IconButton";

type ActionButton = {
  iconName: string;
  alt: string;
  onClick: () => void;
};

type NewsCardActionsProps = {
  actions: ActionButton[];
};

export function NewsCardActions({ actions }: NewsCardActionsProps) {
  return (
    <div className="z-10 flex gap-15">
      {actions.map(({ iconName, alt, onClick }, idx) => (
        <IconButton
          key={idx}
          iconName={iconName}
          alt={alt}
          onClick={onClick}
          className="h-45 w-45 cursor-pointer rounded-full bg-purple-50 hover:!bg-purple-50"
        />
      ))}
    </div>
  );
}
