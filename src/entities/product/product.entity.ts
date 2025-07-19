export class ProductEntity {
  id?: string;
  name: string;
  price: number;
  sku: string;
  createdAt: Date;
  deletedAt?: Date | null;

  constructor(props: {
    name: string;
    price: number;
    sku: string;
    id?: string;
    createdAt?: Date;
    deletedAt?: Date | null;
  }) {
    this.name = props.name;
    this.price = props.price;
    this.sku = props.sku;
    this.id = props.id;
    this.createdAt = props.createdAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }
}
