import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setSettings } from "@/state/SettingsSlice";
import { RootState } from "@/state/Store";
import { postData } from "@/utils/postData";
import { useDispatch, useSelector } from "react-redux";

function SettingsCurrency({ field }: any) {
  const userSettings = useSelector((state: RootState) => state.settings.items);
  const data = useSelector((state: RootState) => state.settings.currencies);
  const dispatch = useDispatch();

  if (userSettings.currency == null || data == null) return;
  return (
    <Select
      value={userSettings.currency}
      onValueChange={(value) => {
        field.onChange(value);
        const selected = data?.find((item) => item.currency == value);

        postData(`user/set/settings`, {
          language: selected?.language,
          currency: selected?.currency,
        }).then(() =>
          dispatch(
            setSettings({
              ...userSettings,
              language: selected?.language,
              currency: selected?.currency,
            })
          )
        );
      }}
      defaultValue={userSettings.currency}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Currency" />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => {
          return (
            <SelectItem key={item.id} value={item.currency}>
              {item.currency}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default SettingsCurrency;
