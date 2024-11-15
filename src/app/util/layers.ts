import {Colors} from './colors';

export class Layers {

  public getCheckBoxArray(): any[] {
    return [
      {
        id: 'points1',
        colors: () => Colors.getColorByLevel(1),
        filter: ['<', ['get', 'height'], 1000],
      },
      {
        id: 'points2',
        colors: () => Colors.getColorByLevel(2),
        filter: [
          'all',
          ['>=', ['get', 'height'], 1000],
          ['<', ['get', 'height'], 2000],
        ],
      },
      {
        id: 'points3',
        colors: () => Colors.getColorByLevel(3),
        filter: [
          'all',
          ['>=', ['get', 'height'], 2000],
          ['<', ['get', 'height'], 3000],
        ],
      },
      {
        id: 'points4',
        colors: () => Colors.getColorByLevel(4),
        filter: [
          'all',
          ['>=', ['get', 'height'], 3000],
          ['<', ['get', 'height'], 4000],
        ],
      },
      {
        id: 'points5',
        colors: () => Colors.getColorByLevel(5),
        filter: [
          'all',
          ['>=', ['get', 'height'], 4000],
          ['<', ['get', 'height'], 5000],
        ],
      },
      {
        id: 'points6',
        colors: () => Colors.getColorByLevel(6),
        filter: [
          'all',
          ['>=', ['get', 'height'], 5000],
          ['<', ['get', 'height'], 6000],
        ],
      },
      {
        id: 'points7',
        colors: () => Colors.getColorByLevel(7),
        filter: [
          'all',
          ['>=', ['get', 'height'], 6000],
          ['<', ['get', 'height'], 8000],
        ],
      },
      {
        id: 'points8',
        colors: () => Colors.getColorByLevel(8),
        filter: [
          'all',
          ['>=', ['get', 'height'], 8000],
          ['<', ['get', 'height'], 10000],
        ],
      },
      {
        id: 'points9',
        colors: () => Colors.getColorByLevel(9),
        filter: [
          'all',
          ['>=', ['get', 'height'], 10000],
          ['<', ['get', 'height'], 12000],
        ],
      },
      {
        id: 'points10',
        colors: () => Colors.getColorByLevel(10),
        filter: ['>=', ['get', 'height'], 12000],
      },
    ];
  }

}
