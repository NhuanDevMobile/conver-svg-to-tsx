import axios from 'axios';
import { ConfigType } from '@svg2jsx/transform';

import useSetState from './useSetState';

import { VariantType } from '../utils/getVariantColor';

interface ITransformer {
  jsx?: string;
  variant: VariantType;
  loading?: boolean;
}

export default function useTransformer() {
  const [transformer, setTransformer] = useSetState<ITransformer>({
    jsx: undefined,
    loading: false,
    variant: VariantType.CLEAR,
  });

  async function transform(svg: string, config: ConfigType, name: string): Promise<void> {
    try {
      setTransformer({
        loading: true,
      });
      const { data } = await axios.post('/api/transform', {
        svg,
        config,
      });
      const iconName = name || 'Icon'; // Nếu name là chuỗi rỗng, sử dụng "Icon"

      const replacements = [
        {
          oldValue: 'function Icon() {',
          newValue: `export const ${iconName} = (props: SVGProps<SVGSVGElement>) => {`,
        },
        { oldValue: 'export default Icon;', newValue: '' },
        {
          oldValue: 'import React from "react";',
          newValue: "import type { SVGProps } from 'react';",
        },

        // Thêm nhiều cặp khác nếu cần
      ];

      let modifiedJsx = data.jsx;

      // Thực hiện thay thế
      replacements.forEach(({ oldValue, newValue }) => {
        const escapedOldValue = oldValue.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&'); // Thoát ký tự đặc biệt
        modifiedJsx = modifiedJsx.replace(new RegExp(escapedOldValue, 'g'), newValue);
      });

      setTransformer({
        jsx: modifiedJsx,
        variant: VariantType.SUCCESS,
      });
    } catch {
      setTransformer({
        jsx: undefined,
        variant: VariantType.ERROR,
      });
    } finally {
      setTransformer({
        loading: false,
      });
    }
  }

  function clear() {
    setTransformer({
      jsx: undefined,
      loading: false,
      variant: VariantType.CLEAR,
    });
  }

  return {
    transformer,
    clear,
    transform,
  };
}
