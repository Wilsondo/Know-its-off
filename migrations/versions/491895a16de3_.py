"""empty message

Revision ID: 491895a16de3
Revises: 47ee4c85fc03
Create Date: 2021-03-08 19:23:39.277445

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '491895a16de3'
down_revision = '47ee4c85fc03'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('tokens', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'tokens')
    # ### end Alembic commands ###