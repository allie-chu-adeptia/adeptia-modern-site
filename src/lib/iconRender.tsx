import * as Icons from 'react-icons/fa';
import { IconPicker } from '../sanity/types/sanity.types';
import cleanString from './cleanString';

const DynamicFontAwesomeIcon = ({ name }: { name: IconPicker['name'] }) => {
  const cleanName = cleanString(name as string)
  return Icons[cleanName as keyof typeof Icons] || null;
};

export default function IconRender({ name, className }: { name: IconPicker['name'], className?: string }) {
  const IconComponent = DynamicFontAwesomeIcon({ name });
  return IconComponent ? <IconComponent className={className} /> : null;
}