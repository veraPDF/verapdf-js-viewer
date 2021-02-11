import {IBboxLocation} from '../index';

export const buildBboxMap = (bboxes: IBboxLocation[]) => {
  const bboxMap = {};
  bboxes.forEach((bbox, index) => {
    if (bbox.page) {
      if (typeof bbox.location !== 'string') {
        bboxMap[bbox.page] = [
          ...(bboxMap[bbox.page] || []),
          {
            index,
            location: bbox.location,
          },
        ];
      } else {
        const bboxesFromLocation = calculateLocation(bbox.location as string);
        bboxesFromLocation.map((bbox: IBboxLocation) => {
          bboxMap[bbox.page] = [
            ...(bboxMap[bbox.page] || []),
            {
              index,
              location: bbox.location,
            },
          ];
        })
      }
    }
  });
  return bboxMap;
}

const calculateLocation = (location: string) => {
  const bboxes = [];
  const [pages, boundingBox] = location.split('/');
  const [start, end] = pages.replace('pages[', '').replace(']', '').split('-');
  const [x, y, x1, y1] = boundingBox.replace('boundingBox[', '').replace(']', '').split(',');
  const width = parseFloat(x1) - parseFloat(x);

  if (end) {
    for (let i = parseInt(start) + 1; i <= parseInt(end) + 1; i++) {
      switch (i) {
        case parseInt(start) + 1:
          bboxes.push({
            page: i,
            location: [parseFloat(x), parseFloat(y1), width, 'bottom'],
          });
          break;
        case parseInt(end) + 1:
          bboxes.push({
            page: i,
            location: [parseFloat(x), parseFloat(y), width, 'top'],
          });
          break;
        default:
          bboxes.push({
            page: i,
            location: [parseFloat(x), 0, width, 'top'],
          });
          break;
      }
    }
  } else {
    const height = parseFloat(y1) - parseFloat(y);
    bboxes.push({
      page: parseFloat(start),
      location: [parseFloat(x), parseFloat(y), width, height],
    })
  }

  return bboxes;
}
