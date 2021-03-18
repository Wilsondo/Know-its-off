"""empty message

Revision ID: 459b3124b82b
Revises: ce44aab37b5b
Create Date: 2021-03-17 02:31:30.211022

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '459b3124b82b'
down_revision = 'ce44aab37b5b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('battery_many_relation_table',
    sa.Column('device_id', sa.Integer(), nullable=False),
    sa.Column('battery_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['battery_id'], ['battery_logger.id'], ),
    sa.ForeignKeyConstraint(['device_id'], ['device.id'], ),
    sa.PrimaryKeyConstraint('device_id', 'battery_id')
    )
    op.drop_column('battery_logger', 'device_id')
    op.drop_constraint('device_ibfk_1', 'device', type_='foreignkey')
    op.create_foreign_key(None, 'device', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    op.add_column('user', sa.Column('tokens', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'tokens')
    op.drop_constraint(None, 'device', type_='foreignkey')
    op.create_foreign_key('device_ibfk_1', 'device', 'user', ['user_id'], ['id'])
    op.add_column('battery_logger', sa.Column('device_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False))
    op.drop_table('battery_many_relation_table')
    # ### end Alembic commands ###