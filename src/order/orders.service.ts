import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { FeedProduct } from '../feed-product/entities/feed-product.entity';
import { User } from '../user/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enum/order-status';
import { PaymentStatus } from './enum/payment-status';
import { RoyaltyPoint } from 'src/royalty-point/entities/royalty-point.entity';
import { PaginationService } from 'src/pagination/pagination_service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(FeedProduct)
    private productRepo: Repository<FeedProduct>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(RoyaltyPoint)
    private royaltyRepo: Repository<RoyaltyPoint>,
  ) {}

  async create(userId: number, dto: CreateOrderDto) {
    const user = await this.userRepo.findOne({ where: { userId } });

    if (!user) throw new NotFoundException('User not found');

    let totalAmount = 0;

    const order = this.orderRepo.create({
      user,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
       totalAmount: 0,
    });

    order.items = [];
    await this.orderRepo.save(order); // ✅ SAVE FIRST (important for FK)

    for (const item of dto.items) {
      const product = await this.productRepo.findOne({
        where: { productId: item.productId },
      });

      if (!product) {
        throw new BadRequestException(`Product ${item.productId} not found`);
      }

      const unitPrice = Number(product.price);
      const subtotal = unitPrice * item.quantity;

      const orderItem = this.itemRepo.create({
        order,
        product,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      });

      totalAmount += subtotal;
      order.items.push(orderItem);
    }

    order.totalAmount = totalAmount;
    await this.orderRepo.save(order);

    // ✅ CREATE ROYALTY RECORD (NOT A NUMBER)
    const pointsEarned = Math.floor(totalAmount / 100);

    const royalty = this.royaltyRepo.create({
      user,
      order,
      pointsEarned,
      pointsReason: `Order #${order.orderId} purchase`,
    });

    await this.royaltyRepo.save(royalty);

    return order;
  }

  findMyOrders(userId: number,page: number,
    limit: number,
    sort?: string,) {

    // return this.orderRepo.find({
    //   where: { user: { userId } },
    //   relations: ['items', 'items.product'],
    // });
    return PaginationService.paginate(this.orderRepo, page, limit, {
      search: userId.toString(),
      searchFields: ['user'], // searchable fields
      sort,
      relations: ['items', 'items.product'],
    });
  }

  async updateStatus(id: number, dto) {
    const order = await this.orderRepo.findOne({ where: { orderId: id } });

    if (!order) throw new NotFoundException('Order not found');

    if (dto.status) order.status = dto.status;
    if (dto.paymentStatus) order.paymentStatus = dto.paymentStatus;

    return this.orderRepo.save(order);
  }
  async findAllOrders(page: number,
    limit: number,sort?: string,) {
  // return this.orderRepo.find({
  //   relations: [
  //     'user',
  //     'items',
  //     'items.product',
  //     'royaltyPoints',
  //   ],
  //   order: { createdAt: 'DESC' },
  // });
    return PaginationService.paginate(this.orderRepo, page, limit, {
      relations: [
        'user',
        'items',
        'items.product',
        'royaltyPoints',
      ],
      // order: { createdAt: 'DESC' },
    });
}

}
