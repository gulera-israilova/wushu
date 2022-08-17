import {Controller, Get, Param} from "@nestjs/common";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ClubsService} from "./clubs.service";


@Controller('club-rating')
@ApiTags('club-rating')
export class ClubRatingController {
    constructor(private clubsService: ClubsService) {
    }
    @ApiOperation({summary: 'Get club rating'})
    @ApiParam({name: 'id', description: 'Club id'})
    @ApiResponse({
        status: 201,
        description: 'Club rating list successfully returned'
    })
    @Get('/rating-by-club/:id')
    async getRating(@Param('id') id: number) {
        return this.clubsService.getRating(id);
    }

}