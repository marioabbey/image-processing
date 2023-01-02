import sharp from 'sharp';

async function resize(
  filePath: string,
  width: number,
  height: number,
  thumbPath: string
): Promise<void> {
  await sharp(filePath)
    .resize(width, height, {
      fit: 'contain',
    })
    .toFile(thumbPath);
}

export default resize;
