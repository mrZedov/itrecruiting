export class GetPhotosDto {
  public ownerId?: string;
  public readonly page: number;
  public readonly maxcount: number;
}
