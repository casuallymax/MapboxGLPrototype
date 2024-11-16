import {Colors} from './colors';

export class Layers {

  public getCheckBoxArray(): any[] {
    return [
      {
        id: 1,
        colors: () => Colors.getColorByLevel(1),
        filter: ['<', ['get', 'height'], 1000],
      },
      {
        id: 2,
        colors: () => Colors.getColorByLevel(2),
        filter: [
          'all',
          ['>=', ['get', 'height'], 1000],
          ['<', ['get', 'height'], 2000],
        ],
      },
      {
        id: 3,
        colors: () => Colors.getColorByLevel(3),
        filter: [
          'all',
          ['>=', ['get', 'height'], 2000],
          ['<', ['get', 'height'], 3000],
        ],
      },
      {
        id: 4,
        colors: () => Colors.getColorByLevel(4),
        filter: [
          'all',
          ['>=', ['get', 'height'], 3000],
          ['<', ['get', 'height'], 4000],
        ],
      },
      {
        id: 5,
        colors: () => Colors.getColorByLevel(5),
        filter: [
          'all',
          ['>=', ['get', 'height'], 4000],
          ['<', ['get', 'height'], 5000],
        ],
      },
      {
        id: 6,
        colors: () => Colors.getColorByLevel(6),
        filter: [
          'all',
          ['>=', ['get', 'height'], 5000],
          ['<', ['get', 'height'], 6000],
        ],
      },
      {
        id: 7,
        colors: () => Colors.getColorByLevel(7),
        filter: [
          'all',
          ['>=', ['get', 'height'], 6000],
          ['<', ['get', 'height'], 8000],
        ],
      },
      {
        id: 8,
        colors: () => Colors.getColorByLevel(8),
        filter: [
          'all',
          ['>=', ['get', 'height'], 8000],
          ['<', ['get', 'height'], 10000],
        ],
      },
      {
        id: 9,
        colors: () => Colors.getColorByLevel(9),
        filter: [
          'all',
          ['>=', ['get', 'height'], 10000],
          ['<', ['get', 'height'], 12000],
        ],
      },
      {
        id: 10,
        colors: () => Colors.getColorByLevel(10),
        filter: ['>=', ['get', 'height'], 12000],
      },
    ];
  }

}
