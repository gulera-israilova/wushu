import { Controller } from '@nestjs/common';
import {SportsmenSubgroupsService} from "./sportsmen-subgroups.service";

@Controller('sportsmen-subgroups')
export class SportsmenSubgroupsController {
    constructor(private sportsmenSubgroupsService: SportsmenSubgroupsService) {}
}
