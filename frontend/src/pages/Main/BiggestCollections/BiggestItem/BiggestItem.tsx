import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import BiggestItemProps from './types';
import styles from './BiggestItem.module.scss';

function BiggestItem({ item, ind }: BiggestItemProps) {
  const chooseColor = () => {
    switch (ind) {
      case 0:
        return ['rgb(255, 215, 0)', '#ffee32'];

      case 1:
        return ['#f2f2f2', '#f8f8ff'];

      case 2:
        return ['rgb(253, 137, 68)', 'rgb(153, 75, 23)'];

      default:
        return ['#042426', '#1f2c2e'];
    }
  };

  return (
    <Link
      as={NavLink}
      to={`/collections/${item.user_id}/${item.id}`}
      className={styles.canvas}
    >
      <div className={styles.border}>
        <svg>
          <defs>
            <linearGradient
              id={`grad_${ind}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: chooseColor()[0], stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: chooseColor()[1], stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <rect
            id="rect-grad"
            className={styles.rect_gradient}
            fill="none"
            stroke={`url(#grad_${ind})`}
            strokeLinecap="square"
            strokeWidth="4"
            strokeMiterlimit="30"
            width="100%"
            height="100%"
          />
        </svg>
      </div>
      <div className={styles['canvas_img-wrapper']}>
        <img className={styles.image} src={item.image_url} alt="" />
      </div>
      <div
        className={clsx(styles.copy, styles['copy--left'], {
          [styles.first]: ind === 0,
          [styles.second]: ind === 1,
          [styles.third]: ind === 2,
        })}
      >
        <span className={styles.subtitle}>{item.items_count}</span>
        <span className={styles.details}>{item.name}</span>
      </div>
    </Link>
  );
}

export default BiggestItem;
