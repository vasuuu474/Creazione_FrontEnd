import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function StatusFilter({ value, onChange, options }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-wider text-muted-foreground">
        PROJECT STATUS
      </h3>
      <RadioGroup value={value} onValueChange={onChange} className="gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={option.value}
            className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
          >
            <RadioGroupItem value={option.value} id={option.value} />
            {option.label}
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
