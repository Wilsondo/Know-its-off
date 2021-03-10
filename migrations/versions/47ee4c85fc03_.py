"""empty message

Revision ID: 47ee4c85fc03
Revises: b2323b2f63e0
Create Date: 2021-03-08 18:09:40.804914

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '47ee4c85fc03'
down_revision = 'b2323b2f63e0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('battery_logger',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('timestamp_time', sa.TIMESTAMP(), nullable=False),
    sa.Column('device_battery', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('battery_many_relation_table',
    sa.Column('device_id', sa.Integer(), nullable=False),
    sa.Column('battery_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['battery_id'], ['battery_logger.id'], ),
    sa.ForeignKeyConstraint(['device_id'], ['device.id'], ),
    sa.PrimaryKeyConstraint('device_id', 'battery_id')
    )
    op.drop_table('batterylogger')
    op.drop_table('battery_table')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('battery_table',
    sa.Column('device_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.Column('battery_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['battery_id'], ['batterylogger.id'], name='battery_table_ibfk_1'),
    sa.ForeignKeyConstraint(['device_id'], ['device.id'], name='battery_table_ibfk_2'),
    sa.PrimaryKeyConstraint('device_id', 'battery_id'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('batterylogger',
    sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=True, nullable=False),
    sa.Column('timestamp_time', mysql.TIMESTAMP(), server_default=sa.text('current_timestamp() ON UPDATE current_timestamp()'), nullable=False),
    sa.Column('device_battery', mysql.FLOAT(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.drop_table('battery_many_relation_table')
    op.drop_table('battery_logger')
    # ### end Alembic commands ###