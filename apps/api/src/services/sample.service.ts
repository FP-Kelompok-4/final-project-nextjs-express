import { ResponseError } from '@/error/response-error';
import prisma from '@/prisma';

export class SampleService {
  static async getSamplesData() {
    const samplesData = await prisma.sample.findMany();

    return samplesData;
  }

  static async getSampleDataById(req: {id: string}) {
    const sample = await prisma.sample.findUnique({
      where: { id: Number(req.id) },
    });

    if (!sample) {
      throw new ResponseError(404, 'Sample data not found !');
    }

    return sample;
  }

  static async addSampleData(req: {name: string, code: string}) {
    const newSampleData = await prisma.sample.create({
      data: req,
    });

    return newSampleData;
  }
}
