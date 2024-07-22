import React, { useCallback } from 'react';

import {
  Capsule,
  IOption,
  Link,
  Tooltip,
  TooltipPlacement,
  TooltipTriggerEvent,
} from '@spglobal/react-components';

import { FilterCapsuleStyle, TooltipListWrap } from '../styles/investmentResearch.styles';

interface OverflowCapsuleProps {
  capsules: IOption[];
  count?: number;
  length?: number;
  onRemoveCapsule?: (item: IOption) => void;
}

const OverflowCapsule: React.FC<OverflowCapsuleProps> = ({
  length = 20,
  capsules,
  count = 1,
  onRemoveCapsule,
}) => {
  const capsuleReverse = capsules.slice(0).reverse();
  const capsulesFinal =
    capsuleReverse.length > count
      ? capsuleReverse.slice(0, count).map((item, index: number) => (
          <span key={index}>
            <FilterCapsuleStyle length={length} isBlue onClose={() => onRemoveCapsule?.(item)}>
              {item.label}
            </FilterCapsuleStyle>
          </span>
        ))
      : capsuleReverse.map((item, index: number) => (
          <FilterCapsuleStyle
            key={index}
            length={length}
            isBlue
            onClose={() => onRemoveCapsule?.(item)}
          >
            {item.label}
          </FilterCapsuleStyle>
        ));
  const onMoreLinkClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    return;
  }, []);
  return (
    capsuleReverse.length > 0 && (
      <>
        {capsulesFinal}
        {capsuleReverse.length > count ? (
          <Tooltip
            placement={TooltipPlacement.BOTTOM}
            closeDelay={500}
            initialDelay={0}
            triggerElement={
              <Link
                onClick={onMoreLinkClick}
                className="spg-ml-sm"
                style={{ whiteSpace: 'nowrap' }}
              >
                + {capsuleReverse.length - count} more
              </Link>
            }
            triggerEvent={TooltipTriggerEvent.HOVER}
          >
            <TooltipListWrap>
              {capsuleReverse.slice(count, capsuleReverse.length).map((item, index: number) => (
                <>
                  <Capsule key={index} onClose={() => onRemoveCapsule?.(item)}>
                    {item.label}
                  </Capsule>
                </>
              ))}
            </TooltipListWrap>
          </Tooltip>
        ) : null}
      </>
    )
  );
};

export default OverflowCapsule;
