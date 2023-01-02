import sharp from 'sharp';
import path from 'path';

async function resize(
  full: string | sharp.SharpOptions | undefined,
  width: number,
  height: number
) {
  await sharp(path.join(__dirname, '../../assets/full', `${full}.jpg`))
    .resize(width, height)
    .toFile(
      path.join(
        __dirname,
        '../../assets/thumb',
        `${full}-${width}x${height}.jpg`
      )
    );
}

export default resize;
